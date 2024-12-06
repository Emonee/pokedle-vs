import asyncio
import json
from urllib.parse import parse_qs, urlparse
from websockets.asyncio.server import serve
from http import HTTPStatus
import os

from action_handler import main_handler
from room import Room
from user import User

port = int(os.getenv("PORT", 5000))

def health_check(connection, request):
    if request.path == "/healthz":
        response = connection.respond(HTTPStatus.OK, "OK")
        response.headers['Access-Control-Allow-Origin'] = "*"
        return response

async def handler(websocket):
    parsed_url = urlparse(websocket.request.path)
    query_params = parse_qs(parsed_url.query)
    user_name = query_params.get("user_name", [None])[0]
    room_name = query_params.get("room_name", [None])[0]
    if not room_name or not user_name:
        await websocket.close(reason="user_name and room_name are required")
        return
    try:
        user = User(user_name, websocket)
        room = Room.find_or_create_room(room_name, user)
    except Exception as e:
        user.disconnect()
        await websocket.close(reason=str(e))
        return
    room.add_user(user)
    await user.send_message(json.dumps({
        'action': 'room_users',
        'data': {
            'room_name': room.name,
            'users': [{ 'user_name': user.name, 'user_tag': user.tag } for user in room.users]
        }
    }))
    async for json_message in websocket:
        message = json.loads(json_message)
        await main_handler(message, room, user)
    user.disconnect()

async def main():
    async with serve(handler, "0.0.0.0", port, process_request=health_check, server_header=None):
        print(f"App running at localhost:{port}")
        await asyncio.get_running_loop().create_future()

if __name__ == "__main__":
    asyncio.run(main())
