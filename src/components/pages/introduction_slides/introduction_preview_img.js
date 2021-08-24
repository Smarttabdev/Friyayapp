import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../../styles/components/intro/preview.scss';

const images = [
  '/images/onboarding/action_plans.png',
  '/images/onboarding/action_plan.png',
  '/images/onboarding/page__2_.png',
  '/images/onboarding/notes__1_.png',
  '/images/onboarding/knowledge_bas__1_.png',
  '/images/onboarding/project__1_.png',
  '/images/onboarding/projects.png',
  '/images/onboarding/files__1_.png'
];

class IntroductionPreviewImg extends Component {
  render() {
    const { productExplanation } = this.props;
    return (
      <div className="row flex-c-center preview-container">
        <h2 className="title">Done! Next, we need to add a few Boards.</h2>
        <p className="sub-title-blue">
          A Board is a multipurpose tool to quickly plan, create, collaborate
          and track.
        </p>
        <p className="sub-title">
          Why it's called a Board?? Because you can do so many things with it!
        </p>
        <div className="row">
          {images.map(img => (
            <div
              key={img}
              className="col-xs-3 flex-c-center"
              style={{ padding: 15 }}
            >
              <img src={img} style={{ width: '22vw' }} />
            </div>
          ))}
        </div>
        {productExplanation.actionText &&
          (productExplanation.actionType == 'url' ? (
            <a href={productExplanation.action}>
              <button className={productExplanation.actionButtonClass}>
                <p>
                  {productExplanation.actionText}
                  <i className="fa fa-long-arrow-right" />
                </p>
              </button>
            </a>
          ) : (
            <a onClick={productExplanation.action}>
              <button className={productExplanation.actionButtonClass}>
                <p>
                  {productExplanation.actionText}
                  <i className="fa fa-long-arrow-right" />
                </p>
              </button>
            </a>
          ))}
      </div>
    );
  }
}

export default withRouter(IntroductionPreviewImg);
