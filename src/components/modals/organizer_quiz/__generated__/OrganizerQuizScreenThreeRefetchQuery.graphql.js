/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenThree_query$ref = any;
export type OrganizerQuizScreenThreeRefetchQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenThreeRefetchQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenThree_query$ref
|};
export type OrganizerQuizScreenThreeRefetchQuery = {|
  variables: OrganizerQuizScreenThreeRefetchQueryVariables,
  response: OrganizerQuizScreenThreeRefetchQueryResponse,
|};
*/


/*
query OrganizerQuizScreenThreeRefetchQuery(
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
    "name": "OrganizerQuizScreenThreeRefetchQuery",
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
    "name": "OrganizerQuizScreenThreeRefetchQuery",
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
    "cacheID": "96f838684cc173c716b35235a224d0f6",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenThreeRefetchQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenThreeRefetchQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenThree_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenThree_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen3\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3cdfc6933e6a0c0e1249655ffc12b42d';

module.exports = node;
