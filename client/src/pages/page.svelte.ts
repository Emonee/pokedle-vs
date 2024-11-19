export enum Page {
  ROOM = 'ROOM',
  ROOT = 'ROOT',
}

export let state = $state({
  page: Page.ROOT,
});
