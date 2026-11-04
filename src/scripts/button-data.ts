export interface ButtonData { snippets: Record<string, string>; prompts: Record<string, string>; }
let dataPromise: Promise<ButtonData> | undefined;
export function loadButtonData() {
  return dataPromise ??= fetch('/button-data.json').then((response) => {
    if (!response.ok) throw new Error('Button data failed to load');
    return response.json() as Promise<ButtonData>;
  }).catch((error) => { dataPromise = undefined; throw error; });
}
