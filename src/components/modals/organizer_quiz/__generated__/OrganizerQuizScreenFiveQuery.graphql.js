/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenFive_query$ref = any;
export type OrganizerQuizScreenFiveQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenFiveQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenFive_query$ref
|};
export type OrganizerQuizScreenFiveQuery = {|
  variables: OrganizerQuizScreenFiveQueryVariables,
  response: OrganizerQuizScreenFiveQueryResponse,
|};
*/


/*
query OrganizerQuizScreenFiveQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenFive_query_1JS2nm
}

fragment OrganizerQuizScreenFive_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen5") {
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
    "name": "OrganizerQuizScreenFiveQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenFive_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenFiveQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen5"
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
    "cacheID": "3bdef71cf899379e9a767229283a9cdc",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenFiveQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenFiveQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenFive_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenFive_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen5\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '24d9783c009d5d3b68610e0570ece058';

module.exports = node;
