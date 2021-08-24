/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamMemberBox_query$ref = any;
export type TeamMemberBoxRefetchQueryVariables = {|
  owner: string
|};
export type TeamMemberBoxRefetchQueryResponse = {|
  +$fragmentRefs: TeamMemberBox_query$ref
|};
export type TeamMemberBoxRefetchQuery = {|
  variables: TeamMemberBoxRefetchQueryVariables,
  response: TeamMemberBoxRefetchQueryResponse,
|};
*/


/*
query TeamMemberBoxRefetchQuery(
  $owner: ID!
) {
  ...TeamMemberBox_query_1JS2nm
}

fragment TeamMemberBox_query_1JS2nm on Query {
  linkedBoardsConfig: config(owner: $owner, config: "TEAM_GOALS_user.boards") {
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
    "name": "TeamMemberBoxRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TeamMemberBox_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TeamMemberBoxRefetchQuery",
    "selections": [
      {
        "alias": "linkedBoardsConfig",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "TEAM_GOALS_user.boards"
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
    "cacheID": "e2f30b28d12fbdfe0302cb5a457789e2",
    "id": null,
    "metadata": {},
    "name": "TeamMemberBoxRefetchQuery",
    "operationKind": "query",
    "text": "query TeamMemberBoxRefetchQuery(\n  $owner: ID!\n) {\n  ...TeamMemberBox_query_1JS2nm\n}\n\nfragment TeamMemberBox_query_1JS2nm on Query {\n  linkedBoardsConfig: config(owner: $owner, config: \"TEAM_GOALS_user.boards\") {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1be4552f1d239aedf17834fde43219a7';

module.exports = node;
