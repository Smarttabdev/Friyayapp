/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamMemberProjectBox_query$ref = any;
export type TeamMemberProjectBoxQueryVariables = {|
  owner: string
|};
export type TeamMemberProjectBoxQueryResponse = {|
  +$fragmentRefs: TeamMemberProjectBox_query$ref
|};
export type TeamMemberProjectBoxQuery = {|
  variables: TeamMemberProjectBoxQueryVariables,
  response: TeamMemberProjectBoxQueryResponse,
|};
*/


/*
query TeamMemberProjectBoxQuery(
  $owner: ID!
) {
  ...TeamMemberProjectBox_query_1JS2nm
}

fragment TeamMemberProjectBox_query_1JS2nm on Query {
  linkedBoardsConfig: config(owner: $owner, config: "TEAM_PROJECTS_user.boards") {
    value
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "owner"
  }
],
v1 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamMemberProjectBoxQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TeamMemberProjectBox_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TeamMemberProjectBoxQuery",
    "selections": [
      {
        "alias": "linkedBoardsConfig",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "TEAM_PROJECTS_user.boards"
          },
          (v1/*: any*/)
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "90691d4cfd83c20539b5e700117d6171",
    "id": null,
    "metadata": {},
    "name": "TeamMemberProjectBoxQuery",
    "operationKind": "query",
    "text": "query TeamMemberProjectBoxQuery(\n  $owner: ID!\n) {\n  ...TeamMemberProjectBox_query_1JS2nm\n}\n\nfragment TeamMemberProjectBox_query_1JS2nm on Query {\n  linkedBoardsConfig: config(owner: $owner, config: \"TEAM_PROJECTS_user.boards\") {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dac8672e573e870712245c3d898fe354';

module.exports = node;
