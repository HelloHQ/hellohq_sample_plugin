type MethodCallHandler = (args: any) => any;
interface MethodChannel {
    addMethodCallHandler(method: string, handler: MethodCallHandler): void;
    removeMethodCallHandler(method: string): void;
    clearMethodCallHandler(): void;
    invokeMethod(method: string, ...args: any[]): Promise<string>
}

interface WebF {
    invokeModule: (module: string, method: string, params?: any | null, fn?: (err: Error, data: any) => any) => any;
    addWebfModuleListener: (moduleName: string, fn: (event: Event, extra: any) => any) => void;
    methodChannel: MethodChannel;
}

declare const webf: WebF;