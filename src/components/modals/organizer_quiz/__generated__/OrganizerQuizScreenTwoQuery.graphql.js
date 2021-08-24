/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenTwo_query$ref = any;
export type OrganizerQuizScreenTwoQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenTwoQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenTwo_query$ref
|};
export type OrganizerQuizScreenTwoQuery = {|
  variables: OrganizerQuizScreenTwoQueryVariables,
  response: OrganizerQuizScreenTwoQueryResponse,
|};
*/


/*
query OrganizerQuizScreenTwoQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenTwo_query_1JS2nm
}

fragment OrganizerQuizScreenTwo_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen2") {
    id
    value
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
    "name": "OrganizerQuizScreenTwoQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenTwo_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenTwoQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen2"
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
    ]
  },
  "params": {
    "cacheID": "905a1429e6c8b93e00ec15610d338f50",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenTwoQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenTwoQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenTwo_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenTwo_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen2\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3cd878eaf7c928ddbad43eb5970cf5cd';

module.exports = node;
