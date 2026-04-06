/**
 * QuillForms Depndencies
 */
import { useMessages } from "@quillforms/renderer-core";

/**
 * External Dependencies
 */
import classnames from "classnames";
import { css } from "emotion";
import { useState } from "react";
import tinyColor from "tinycolor2";

const ChoiceItem = ({
  order,
  selected,
  choiceLabel,
  clickHandler,
  imageUrl,
  imgWidth,
  imgHeight,
  theme
}) => {
  const { answersColor } = theme;
  const messages = useMessages();
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      onClick={() => {
        clickHandler();
        if (!selected) {
          setIsClicked(false);
          setTimeout(() => {
            setIsClicked(true);
          }, 0);
        }
      }}
      className={classnames(
        {
          selected,
          clicked: isClicked
        },
        css`
          display: flex;
          flex-direction: column;
          border-radius: 5px;
          cursor: pointer;
          padding: 10px;
          margin: 0 16px 16px 0;
          box-shadow: none;
          outline: none;
          position: relative;
          border-style: solid;
          border-width: 1px;
          user-select: none;
          font-size: 14px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;

          @media (max-width: 600px) {
            margin: 0 16px 10px 0;
            padding: 8px 10px;
            border-radius: 4px;
            font-size: 14px;
          }

          background: ${tinyColor(answersColor).setAlpha(0.1).toString()};

          border-color: ${answersColor};
          color: ${answersColor};

          &:hover {
            background: ${tinyColor(answersColor).setAlpha(0.2).toString()};
          }

          &.selected {
            background: ${tinyColor(answersColor).setAlpha(0.75).toString()};
            color: ${tinyColor(answersColor).isDark() ? "#fff" : "#333"};

            .pictureChoice__optionKey {
              color: ${tinyColor(answersColor).isDark() ? "#fff" : "#333"};

              border-color: ${tinyColor(answersColor).isDark()
                ? "#fff"
                : "#333"};
            }
          }
        `
      )}
    >
      <div
        className={css`
          width: 100%;
          text-align: center;
          margin-bottom: 5px;
          width: ${imgWidth}px;
          height: ${imgHeight}px;
        `}
      >
        {imageUrl && (
          <img
            className={css`
              max-width: 100%;
              max-height: 100%;
              width: 100%;
              height: 100%;
              object-fit: cover;
            `}
            src={imageUrl}
          />
        )}
      </div>
      <div
        role="presentation"
        className={classnames(
          "pictureChoice__optionLabelWrapper",
          css`
            width: ${imgWidth}px;
          `
        )}
      >
        <span className="pictureChoice__optionLabel">{choiceLabel}</span>
        <span
          className={classnames(
            "pictureChoice__optionKey",
            css`
              background: ${tinyColor(answersColor).setAlpha(0.1).toString()};
              color: ${answersColor};
              border-color: ${tinyColor(answersColor).setAlpha(0.4).toString()};
            `
          )}
        >
          <span
            className={classnames(
              "pictureChoice__optionKeyTip",
              css`
                background: ${answersColor};
                color: ${tinyColor(answersColor).isDark() ? "#fff" : "#333"};
              `
            )}
          >
            {messages["label.hintText.key"]}
          </span>
          {order}
        </span>
      </div>
    </div>
  );
};

export default ChoiceItem;
