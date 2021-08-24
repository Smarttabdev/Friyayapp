import React, { useState } from 'react';
import {
  createTopicDesign,
  activateDefaultDesign
} from 'Src/newRedux/database/topics/thunks';
import { connect } from 'react-redux';
import { failure } from 'Utils/toast';

function IntroChooseDesign(props) {
  const [background, setBackground] = useState({
    backgroundColor: null,
    backgroundImage: null
  });
  const [fontColor, setFontColor] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('default');

  const { history } = props;
  const defaultBackgroundColor = '#ffffff';
  const defaultFontColor = '#242424';

  const themeList = [
    {
      id: 'default',
      background: defaultBackgroundColor,
      fontColor: defaultFontColor
    },
    {
      id: 'dark',
      background: '#242424',
      fontColor: '#E1E1E1'
    },
    {
      id: 'Gradient_Blue',
      background: '/images/themeImage/Gradient_Blue.jpeg',
      fontColor: '#ffffff'
    },
    {
      id: 'tanya-grypachevskaya',
      background:
        '/images/themeImage/tanya-grypachevskaya-TtN03jUTA70-unsplash__1_.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'henrique-ferreira',
      background:
        '/images/themeImage/henrique-ferreira-fkwglVYEaRI-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'zoltan-tasi',
      background: '/images/themeImage/zoltan-tasi-KHD_FA43aMw-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'Waterfall',
      background: '/images/themeImage/Waterfall.png',
      fontColor: '#ffffff'
    },
    {
      id: 'david-marcu',
      background: '/images/themeImage/david-marcu-W5MhJ6cy1So-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'hugo-sousa',
      background: '/images/themeImage/hugo-sousa-BghGseQbAkA-unsplash.jpg',
      fontColor: defaultFontColor
    },
    {
      id: 'luke-stackpoole',
      background: '/images/themeImage/luke-stackpoole--gy4s9SQ1RI-unsplash.jpg',
      fontColor: defaultFontColor
    },
    {
      id: 'todd-steitle',
      background: '/images/themeImage/todd-steitle-ExnAdmi-Asc-unsplash.jpg',
      fontColor: defaultFontColor
    },
    {
      id: 'casey-horner',
      background: '/images/themeImage/casey-horner-O0R5XZfKUGQ-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'tatyana-dobreva',
      background: '/images/themeImage/tatyana-dobreva-i6Wc5qZO5MQ-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'geran-de-klerk',
      background: '/images/themeImage/geran-de-klerk-qzgN45hseN0-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'zoltan-tasi-2',
      background: '/images/themeImage/zoltan-tasi-oBTC7jviUxs-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'adrian-hartanto',
      background: '/images/themeImage/adrian-hartanto-uZFwvWVtL-c-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'zoltan-tasi-3',
      background: '/images/themeImage/zoltan-tasi-t8__xN-MdNI-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'william-bout',
      background: '/images/themeImage/william-bout-7cdFZmLlWOM-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'bozidar-vukadinovic',
      background:
        '/images/themeImage/bozidar-vukadinovic-AZXexxUfgc8-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'siyuan',
      background: '/images/themeImage/siyuan-0z0ZcjICFiM-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'samuel-scrimshaw',
      background:
        '/images/themeImage/samuel-scrimshaw-sseiVD2XsOk-unsplash.jpg',
      fontColor: '#ffffff'
    },
    {
      id: 'joshua-sortino',
      background: '/images/themeImage/joshua-sortino-Rnqa6jOpnHw-unsplash.jpg',
      fontColor: '#ffffff'
    }
  ];

  const submitDesign = async () => {
    if (selectedTheme != 'default') {
      await props.createTopicDesign({
        topic_id: 1, //root board / main board id: 1
        name: 'Main Board',
        card_font_color: [
          'hugo-sousa',
          'luke-stackpoole',
          'todd-steitle'
        ].includes(selectedTheme)
          ? null
          : fontColor,
        card_background_color: background?.backgroundColor || null,
        card_background_color_display: Boolean(background?.backgroundColor),
        card_background_image_url: background?.backgroundImage || null,
        card_background_image_display: Boolean(background?.backgroundImage)
      });

      await props.activateDefaultDesign({
        topic_id: 1, //root board / main board id: 1
        design_id: 0
      });
    }

    history.push('/introduction/create_boards');
  };

  const handleFilePicker = () => {
    filepicker.pick(
      { services: ['COMPUTER', 'DROPBOX', 'BOX', 'IMAGE_SEARCH'] },
      response => {
        setBackground({ backgroundImage: response.url }),
          setFontColor('#ffffff'),
          setSelectedTheme('selected_image');
      },
      () => {
        failure('Cancelled select image');
      }
    );
  };

  return (
    <div
      className="intro-choose-design"
      style={{
        color: fontColor,
        background:
          background?.backgroundColor ||
          `url(${background.backgroundImage}) no-repeat center center / cover`
      }}
    >
      <header>
        <img className="friyay-logo" src="/images/Friyay-Logo-01.png" />
      </header>
      <section className="main-content">
        <div className="top-section">
          <h1>Choose a design for your Main Board</h1>
          <button className="top-next-button" onClick={submitDesign}>
            Next <span>&gt;</span>
          </button>
        </div>
        <div className="theme-list">
          {themeList.map(theme => (
            <div
              className="theme-box pointer"
              key={theme.id}
              style={{
                borderColor: theme.fontColor,
                background:
                  (theme.id != 'default' &&
                    theme.id != 'dark' &&
                    `url(${theme.background})`) ||
                  theme.background,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => (
                setBackground(
                  (theme.id != 'default' &&
                    theme.id != 'dark' && {
                      backgroundImage: theme.background
                    }) || { backgroundColor: theme.background }
                ),
                setFontColor(theme.fontColor),
                setSelectedTheme(theme.id)
              )}
            />
          ))}

          <button
            className="theme-box select-image"
            style={{ borderColor: 'rgb(36, 36, 36)' }}
            onClick={handleFilePicker}
          >
            Select images
          </button>
        </div>
        <div className="footer-button" style={{ color: fontColor }}>
          <button
            className="next-button"
            style={{ borderColor: fontColor }}
            onClick={submitDesign}
          >
            NEXT
          </button>
          <button className="go-back" onClick={() => history.goBack()}>
            Go back
          </button>
        </div>
      </section>
    </div>
  );
}

const mapDispatch = {
  createTopicDesign,
  activateDefaultDesign
};

export default connect(null, mapDispatch)(IntroChooseDesign);
