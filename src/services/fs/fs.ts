import { expoFileSystem } from "./implementation/expoFileSystem";
import { FsImpl } from "./types";

export let fs: FsImpl = expoFileSystem;

export function setFsImplementation(fsImpl: FsImpl) {
  fs = fsImpl;
}
