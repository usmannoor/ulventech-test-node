class HelperUtil {
  public throwError(error): never {
    throw new Error(error);
  }
}

export default HelperUtil;
