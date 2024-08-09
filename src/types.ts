export type Config = {
  [key: string]: any,
  el: HTMLElement,
  fit?: 'fill' | 'contain' | 'scroll' | 'hidden',
  uw?: number,
  uh?: number,
  resize?: boolean,
}
export type Data = {
  [key: string]: any,
  el: HTMLElement | null,
  raw_el: any,
  fit: String,
  uw: number,
  uh: number,
  vw: number,
  vh: number,
  resize: boolean
}