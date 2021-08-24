/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenFour_query$ref = any;
export type OrganizerQuizScreenFourQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenFourQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenFour_query$ref
|};
export type OrganizerQuizScreenFourQuery = {|
  variables: OrganizerQuizScreenFourQueryVariables,
  response: OrganizerQuizScreenFourQueryResponse,
|};
*/


/*
query OrganizerQuizScreenFourQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenFour_query_1JS2nm
}

fragment OrganizerQuizScreenFour_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen4") {
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
    "name": "OrganizerQuizScreenFourQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenFour_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenFourQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen4"
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
    "cacheID": "4df62844890c070e59424a827adc6593",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenFourQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenFourQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenFour_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenFour_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen4\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '96b7d138e738d6b1f6d739259c50eb57';

module.exports = node;
