/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TopicTile_query$ref: FragmentReference;
declare export opaque type TopicTile_query$fragmentType: TopicTile_query$ref;
export type TopicTile_query = {|
  +config: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: TopicTile_query$ref,
|};
export type TopicTile_query$data = TopicTile_query;
export type TopicTile_query$key = {
  +$data?: TopicTile_query$data,
  +$fragmentRefs: TopicTile_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "owner"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopicTile_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "hide_home_main_board_message"
        },
        {
          "kind": "Variable",
          "name": "owner",
          "variableName": "owner"
        }
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'a6c4b0b52aa48b2b7612f612aba542f0';

module.exports = node;
