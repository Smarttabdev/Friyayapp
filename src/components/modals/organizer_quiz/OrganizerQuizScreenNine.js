import React from 'react';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const list = [
  {
    label: 'Hiring'
  },
  {
    label: 'New employee onboarding'
  },
  {
    label: 'Software development'
  },
  {
    label: 'Sales playbook'
  },
  {
    label: 'Product Launch'
  },
  {
    label: 'Strategic plan'
  },
  {
    label: 'HR handbook'
  },
  {
    label: 'Inventory'
  },
  {
    label: 'Research'
  }
];

const OrganizerQuizScreenNine = () => {
  return (
    <div className="organizer-quiz__screen">
      <h4>What to organize?</h4>
      <div className=" organizer-quiz__screen-small">
        {list.map((x, i) => (
          <div className="organizer-quiz__screen-small__block" key={i}>
            <div className="organizer-quiz__screen-small__block-card">
              <p
                style={{
                  fontWeight: 600,
                  padding: '5px 10px',
                  textAlign: 'center'
                }}
              >
                {x.label}
              </p>
            </div>
            <span className="mt5">
              <Switch on={false} />
            </span>
          </div>
        ))}
      </div>
      <OrganizerQuizFooter content="Based on your selections, Friyay will add some of your default configurations. You can change these at any time" />
    </div>
  );
};

export default OrganizerQuizScreenNine;
