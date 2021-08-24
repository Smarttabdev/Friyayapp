/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TeamMemberProjectBox_query$ref: FragmentReference;
declare export opaque type TeamMemberProjectBox_query$fragmentType: TeamMemberProjectBox_query$ref;
export type TeamMemberProjectBox_query = {|
  +linkedBoardsConfig: ?{|
    +value: ?any
  |},
  +$refType: TeamMemberProjectBox_query$ref,
|};
export type TeamMemberProjectBox_query$data = TeamMemberProjectBox_query;
export type TeamMemberProjectBox_query$key = {
  +$data?: TeamMemberProjectBox_query$data,
  +$fragmentRefs: TeamMemberProjectBox_query$ref,
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
  "name": "TeamMemberProjectBox_query",
  "selections": [
    {
      "alias": "linkedBoardsConfig",
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "TEAM_PROJECTS_user.boards"
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
(node/*: any*/).hash = '384b0e1177ffb94d85d24f7d48ee883b';

module.exports = node;
