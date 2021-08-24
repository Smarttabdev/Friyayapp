/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RightLensesMenu_query$ref: FragmentReference;
declare export opaque type RightLensesMenu_query$fragmentType: RightLensesMenu_query$ref;
export type RightLensesMenu_query = {|
  +activePinnedLensesOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +screenOneFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +screenTwoFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +screenFourFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +screenSevenFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +screenEightFavTools: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: RightLensesMenu_query$ref,
|};
export type RightLensesMenu_query$data = RightLensesMenu_query;
export type RightLensesMenu_query$key = {
  +$data?: RightLensesMenu_query$data,
  +$fragmentRefs: RightLensesMenu_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
},
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "owner"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "RightLensesMenu_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "topicId"
        }
      ],
      "concreteType": "PinnedLensesOrder",
      "kind": "LinkedField",
      "name": "activePinnedLensesOrder",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
        (v1/*: any*/)
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": (v2/*: any*/),
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
        (v1/*: any*/)
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": (v2/*: any*/),
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
        (v1/*: any*/)
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": (v2/*: any*/),
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
        (v1/*: any*/)
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": (v2/*: any*/),
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
        (v1/*: any*/)
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a8e58f3dfe47bc8f266a93ac63fa632a';

module.exports = node;
