export interface FsImpl {
  readingInBase64File(uri: string): Promise<string>;
}
