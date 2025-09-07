import { $applyNodeReplacement, DecoratorNode, type LexicalNode, type LexicalUpdateJSON, type NodeKey, type SerializedLexicalNode } from 'lexical';
import type { JSX } from 'react';

interface SerializedCustomNode extends SerializedLexicalNode {

}
export class MathNode extends DecoratorNode<JSX.Element> {
  __id: string;

  static getType(): string {
    return 'math';
  }


  static clone(node: MathNode): MathNode {
    return new MathNode(node.__id, node.__key);
  }

  static importJSON(serializedNode: LexicalUpdateJSON<SerializedCustomNode>): MathNode {
    return new MathNode('math').updateFromJSON(serializedNode);
  }
  constructor(id: string, key?: NodeKey) {
    super(key);
    this.__id = id;
  }

  createDOM(): HTMLElement {
    const element = document.createElement('div');
    element.style.display = 'inline';
    return element;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    //return <div>Math</div>
    return <math-field >{`\\frac{1}{2}`}</math-field>;
  }
}

export function $createMathNode(id: string): MathNode {
  //return $applyNodeReplacement(new MathNode(id));
  return new MathNode(id);
}

export function $isMathNode(node: LexicalNode | null | undefined,): node is MathNode {
  return node instanceof MathNode;
}