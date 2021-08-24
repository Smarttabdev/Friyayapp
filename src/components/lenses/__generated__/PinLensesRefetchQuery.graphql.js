/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PinLenses_query$ref = any;
export type PinLensesRefetchQueryVariables = {|
  topicId?: ?string,
  owner: string,
|};
export type PinLensesRefetchQueryResponse = {|
  +$fragmentRefs: PinLenses_query$ref
|};
export type PinLensesRefetchQuery = {|
  variables: PinLensesRefetchQueryVariables,
  response: PinLensesRefetchQueryResponse,
|};
*/


/*
query PinLensesRefetchQuery(
  $topicId: ID
  $owner: ID!
) {
  ...PinLenses_query_4xevJw
}

fragment PinLenses_query_4xevJw on Query {
  activePinnedLensesOrder(topicId: $topicId) {
    id
    name
    order
  }
  screenOneFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen1") {
    id
    value
  }
  screenTwoFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen2") {
    id
    value
  }
  screenFourFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen4") {
    id
    value
  }
  screenSevenFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen7") {
    id
    value
  }
  screenEightFavTools: config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen8") {
    id
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v2 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
},
v3 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PinLensesRefetchQuery",
    "selections": [
      {
        "args": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "PinLenses_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PinLensesRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          (v3/*: any*/)
        ],
        "concreteType": "PinnedLensesOrder",
        "kind": "LinkedField",
        "name": "activePinnedLensesOrder",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "order",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "screenOneFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen1"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "screenTwoFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen2"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "screenFourFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen4"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "screenSevenFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen7"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": "screenEightFavTools",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen8"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ec626c4e8488430d33d98ff7226dd0f5",
    "id": null,
    "metadata": {},
    "name": "PinLensesRefetchQuery",
    "operationKind": "query",
    "text": "query PinLensesRefetchQuery(\n  $topicId: ID\n  $owner: ID!\n) {\n  ...PinLenses_query_4xevJw\n}\n\nfragment PinLenses_query_4xevJw on Query {\n  activePinnedLensesOrder(topicId: $topicId) {\n    id\n    name\n    order\n  }\n  screenOneFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen1\") {\n    id\n    value\n  }\n  screenTwoFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen2\") {\n    id\n    value\n  }\n  screenFourFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen4\") {\n    id\n    value\n  }\n  screenSevenFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen7\") {\n    id\n    value\n  }\n  screenEightFavTools: config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen8\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7b40b8a827247ae889055964e5569aaa';

module.exports = node;
