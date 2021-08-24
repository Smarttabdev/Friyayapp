/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenThree_query$ref = any;
export type OrganizerQuizScreenThreeQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenThreeQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenThree_query$ref
|};
export type OrganizerQuizScreenThreeQuery = {|
  variables: OrganizerQuizScreenThreeQueryVariables,
  response: OrganizerQuizScreenThreeQueryResponse,
|};
*/


/*
query OrganizerQuizScreenThreeQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenThree_query_1JS2nm
}

fragment OrganizerQuizScreenThree_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen3") {
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
    "name": "OrganizerQuizScreenThreeQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenThree_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenThreeQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen3"
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
    "cacheID": "94507a358d03d913f0ffa29e4ba2251a",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenThreeQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenThreeQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenThree_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenThree_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen3\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c847fe14da9bc8b5cce60766e7e915ad';

module.exports = node;
