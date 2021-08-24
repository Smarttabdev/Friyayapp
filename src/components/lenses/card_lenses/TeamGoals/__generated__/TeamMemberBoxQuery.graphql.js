/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamMemberBox_query$ref = any;
export type TeamMemberBoxQueryVariables = {|
  owner: string
|};
export type TeamMemberBoxQueryResponse = {|
  +$fragmentRefs: TeamMemberBox_query$ref
|};
export type TeamMemberBoxQuery = {|
  variables: TeamMemberBoxQueryVariables,
  response: TeamMemberBoxQueryResponse,
|};
*/


/*
query TeamMemberBoxQuery(
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
    "name": "TeamMemberBoxQuery",
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
    "name": "TeamMemberBoxQuery",
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
    "cacheID": "bb315091b1d0410d6d815dda30087417",
    "id": null,
    "metadata": {},
    "name": "TeamMemberBoxQuery",
    "operationKind": "query",
    "text": "query TeamMemberBoxQuery(\n  $owner: ID!\n) {\n  ...TeamMemberBox_query_1JS2nm\n}\n\nfragment TeamMemberBox_query_1JS2nm on Query {\n  linkedBoardsConfig: config(owner: $owner, config: \"TEAM_GOALS_user.boards\") {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '09bcbbf9da0e12a6bee22895e193757b';

module.exports = node;
