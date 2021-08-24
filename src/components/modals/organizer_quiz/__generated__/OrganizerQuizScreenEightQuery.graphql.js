/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenEight_query$ref = any;
export type OrganizerQuizScreenEightQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenEightQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenEight_query$ref
|};
export type OrganizerQuizScreenEightQuery = {|
  variables: OrganizerQuizScreenEightQueryVariables,
  response: OrganizerQuizScreenEightQueryResponse,
|};
*/


/*
query OrganizerQuizScreenEightQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenEight_query_1JS2nm
}

fragment OrganizerQuizScreenEight_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen8") {
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
    "name": "OrganizerQuizScreenEightQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenEight_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenEightQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen8"
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
    "cacheID": "2efee1b4c9b4ca17c49db36ed3308742",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenEightQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenEightQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenEight_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenEight_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen8\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b76a04307ac3237824ac8aa423b22267';

module.exports = node;
