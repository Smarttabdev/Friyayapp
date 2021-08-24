/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type LiveVideoRoomsLens_liveVideoChats$ref: FragmentReference;
declare export opaque type LiveVideoRoomsLens_liveVideoChats$fragmentType: LiveVideoRoomsLens_liveVideoChats$ref;
export type LiveVideoRoomsLens_liveVideoChats = {|
  +tips: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
        +topic: ?{|
          +id: string,
          +title: string,
        |},
      |}
    |}>
  |},
  +$refType: LiveVideoRoomsLens_liveVideoChats$ref,
|};
export type LiveVideoRoomsLens_liveVideoChats$data = LiveVideoRoomsLens_liveVideoChats;
export type LiveVideoRoomsLens_liveVideoChats$key = {
  +$data?: LiveVideoRoomsLens_liveVideoChats$data,
  +$fragmentRefs: LiveVideoRoomsLens_liveVideoChats$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveVideoRoomsLens_liveVideoChats",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "liveVideoChats",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "subtopics",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "topicId"
        }
      ],
      "concreteType": "TipConnection",
      "kind": "LinkedField",
      "name": "tips",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TipEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Tip",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Topic",
                  "kind": "LinkedField",
                  "name": "topic",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    (v1/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '101d29fe1624d92a2aea0b94f0b69072';

module.exports = node;
