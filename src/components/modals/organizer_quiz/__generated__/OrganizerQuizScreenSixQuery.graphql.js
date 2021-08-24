/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenSix_query$ref = any;
export type OrganizerQuizScreenSixQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenSixQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenSix_query$ref
|};
export type OrganizerQuizScreenSixQuery = {|
  variables: OrganizerQuizScreenSixQueryVariables,
  response: OrganizerQuizScreenSixQueryResponse,
|};
*/


/*
query OrganizerQuizScreenSixQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenSix_query_1JS2nm
}

fragment OrganizerQuizScreenSix_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen6") {
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
    "name": "OrganizerQuizScreenSixQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenSix_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenSixQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen6"
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
    "cacheID": "f5fa80b42ef5d41b1320c0cec00715d9",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenSixQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenSixQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenSix_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenSix_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen6\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0b4b4b450a1ea2484268db7f0316922b';

module.exports = node;
