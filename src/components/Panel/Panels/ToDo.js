import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { PulseComponent } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/pulse';
import BackButton from '../BackButton';
import '../styles.module.scss';

let id = 1;

const dummyAttrs = {
  updates: []
};

const data = [
  {
    id: id++,
    text: '16 best ways to avoid unhappy customers',
    attributes: cloneDeep(dummyAttrs)
  },
  {
    id: id++,
    text: 'Fix this issue',
    attributes: cloneDeep(dummyAttrs)
  },
  {
    id: id++,
    text: 'Blog post',
    attributes: cloneDeep(dummyAttrs)
  },
  {
    id: id++,
    text: 'Youtube video',
    attributes: cloneDeep(dummyAttrs)
  },
  {
    id: id++,
    text: 'Club event',
    attributes: cloneDeep(dummyAttrs)
  },
  {
    id: id++,
    text: 'Party invites',
    attributes: cloneDeep(dummyAttrs)
  }
];

const ToDo = () => {
  const [todos, setTodos] = useState(data);

  const createHandleClickItem = item => () => {
    setTodos(
      todos.map(todo => {
        if (todo.id === item.id) {
          todo.checked = !todo.checked;
        }
        return todo;
      })
    );
  };

  const createHandleValueUpdate = item => updates => {
    console.log(item.id, updates);
  };

  return (
    <div styleName="panel todos">
      <div styleName="topbar">
        <BackButton />
        <div styleName="title">ToDo in Promotion project</div>
      </div>
      <div styleName="panel-main todo-list">
        {todos.map((item, i) => (
          <div key={i} styleName="list-item todo-item">
            <div styleName="checkbox" onClick={createHandleClickItem(item)}>
              <i className="material-icons-outlined">
                {item.checked ? 'check_box' : 'check_box_outline_blank'}
              </i>
            </div>
            <div styleName="text">{item.text}</div>
            <div styleName="pulse-btn">
              <PulseComponent
                handleValueUpdate={createHandleValueUpdate(item)}
                card={item}
                isFixed
              />
            </div>
          </div>
        ))}
        <div styleName="list-item add-card-item">
          <div styleName="add-card-btn">+Add Card</div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
