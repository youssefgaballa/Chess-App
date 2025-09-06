import {
    $create,
    //$getState,
    //$getStateChange,
    $setState,
    DecoratorNode,
    //type EditorConfig,
    type LexicalNode,
    createState,
} from 'lexical';
import type { JSX } from 'react';

const idState = createState('id', {
    parse: (value) => (typeof value === 'string' ? value : ''),
});

export class MathNode extends DecoratorNode<JSX.Element> {
    $config() {
        return this.config('math', {
            extends: DecoratorNode,
            stateConfigs: [{ flat: true, stateConfig: idState }],
        });
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): false {
        return false;
    }

    decorate(): JSX.Element {
        return <div>Custom Element</div>
    }
}

export function $createVideoNode(id: string): MathNode {
    return $setState($create(MathNode), idState, id);
}

export function $isMathNoder(
    node: LexicalNode | null | undefined,
): node is MathNode {
    return node instanceof MathNode;
}