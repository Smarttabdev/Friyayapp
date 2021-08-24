/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TeamMemberBox_query$ref: FragmentReference;
declare export opaque type TeamMemberBox_query$fragmentType: TeamMemberBox_query$ref;
export type TeamMemberBox_query = {|
  +linkedBoardsConfig: ?{|
    +value: ?any
  |},
  +$refType: TeamMemberBox_query$ref,
|};
export type TeamMemberBox_query$data = TeamMemberBox_query;
export type TeamMemberBox_query$key = {
  +$data?: TeamMemberBox_query$data,
  +$fragmentRefs: TeamMemberBox_query$ref,
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
  "name": "TeamMemberBox_query",
  "selections": [
    {
      "alias": "linkedBoardsConfig",
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "TEAM_GOALS_user.boards"
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
(node/*: any*/).hash = '54629cbab82748b6e3a2d05bc782e528';

module.exports = node;
