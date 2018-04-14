/* SystemJS module definition */
declare var module : NodeModule;
interface NodeModule {
  id : string;
}

declare module '*.html' {
  var template: string;
  export default template;
}
