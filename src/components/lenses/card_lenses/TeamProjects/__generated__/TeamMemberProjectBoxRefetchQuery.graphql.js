/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamMemberProjectBox_query$ref = any;
export type TeamMemberProjectBoxRefetchQueryVariables = {|
  owner: string
|};
export type TeamMemberProjectBoxRefetchQueryResponse = {|
  +$fragmentRefs: TeamMemberProjectBox_query$ref
|};
export type TeamMemberProjectBoxRefetchQuery = {|
  variables: TeamMemberProjectBoxRefetchQueryVariables,
  response: TeamMemberProjectBoxRefetchQueryResponse,
|};
*/


/*
query TeamMemberProjectBoxRefetchQuery(
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
    "name": "TeamMemberProjectBoxRefetchQuery",
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
    "name": "TeamMemberProjectBoxRefetchQuery",
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
    "cacheID": "ebecab89eecf831572b220eaffe0098a",
    "id": null,
    "metadata": {},
    "name": "TeamMemberProjectBoxRefetchQuery",
    "operationKind": "query",
    "text": "query TeamMemberProjectBoxRefetchQuery(\n  $owner: ID!\n) {\n  ...TeamMemberProjectBox_query_1JS2nm\n}\n\nfragment TeamMemberProjectBox_query_1JS2nm on Query {\n  linkedBoardsConfig: config(owner: $owner, config: \"TEAM_PROJECTS_user.boards\") {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '201e7809fa5298bd2ab4a7b7b36bfa9b';

module.exports = node;
