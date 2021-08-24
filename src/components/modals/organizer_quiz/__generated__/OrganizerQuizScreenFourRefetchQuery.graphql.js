/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenFour_query$ref = any;
export type OrganizerQuizScreenFourRefetchQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenFourRefetchQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenFour_query$ref
|};
export type OrganizerQuizScreenFourRefetchQuery = {|
  variables: OrganizerQuizScreenFourRefetchQueryVariables,
  response: OrganizerQuizScreenFourRefetchQueryResponse,
|};
*/


/*
query OrganizerQuizScreenFourRefetchQuery(
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
    "name": "OrganizerQuizScreenFourRefetchQuery",
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
    "name": "OrganizerQuizScreenFourRefetchQuery",
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
    "cacheID": "1a367b68d4ee02f1248e5ec3e526994c",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenFourRefetchQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenFourRefetchQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenFour_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenFour_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen4\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '68616f96c23fef1985521928cf562564';

module.exports = node;
