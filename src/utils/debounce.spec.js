import debounce from "./debounce";

describe("debounce function", () => {
  jest.useFakeTimers();

  it("should debounce a function", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 200);

    // Call the debounced function immediately
    debouncedFunction();
    expect(mockFunction).not.toBeCalled();

    // Fast-forward time by 199 milliseconds
    jest.advanceTimersByTime(199);
    expect(mockFunction).not.toBeCalled();

    // Fast-forward time by 1 millisecond
    jest.advanceTimersByTime(1);
    expect(mockFunction).toBeCalledTimes(1);

    // Call the debounced function again
    debouncedFunction();
    expect(mockFunction).toBeCalledTimes(1);

    // Fast-forward time by 199 milliseconds
    jest.advanceTimersByTime(199);
    expect(mockFunction).toBeCalledTimes(1);

    // Fast-forward time by 1 millisecond
    jest.advanceTimersByTime(1);
    expect(mockFunction).toBeCalledTimes(2);
  });

  it("should debounce with the correct context and arguments", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 200);
    const context = { key: "value" };
    const args = [1, 2, 3];

    debouncedFunction.apply(context, args);

    // Fast-forward time by 200 milliseconds
    jest.advanceTimersByTime(200);

    expect(mockFunction).toBeCalledWith(...args);
    expect(mockFunction.mock.instances[0]).toBe(context);
  });
});
