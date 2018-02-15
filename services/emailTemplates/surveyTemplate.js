import keys from '../../config/keys';

export default survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3 style="color: black; font-family: arial; line-height: 1.25;
              margin: 0 0 10px; font-size: 30px; font-weight: bold;">
          I'd like your input!
          </h3>
          <p style="color: #333333; font-family: Arial; font-size: 16px;
                    font-weight: 300; line-height: 1.5625; margin-bottom: 15px;">
          Please answer the following question:
          </p>
          <p style="color: #333333; font-family: Arial; font-size: 16px;
                    font-weight: 300; line-height: 1.5625; margin-bottom: 15px;">
          ${survey.body}
          </p>
          <div>
          <a href="${keys.redirectDomain}/api/surveys/thanks">
            <button
            type="button"
            style="background-color: #4caf50; border: none;
                  color: white; padding: 10px 24px;
                  text-decoration: none; display: inline-block;
                  font-size: 14px; border-radius: 12px;">
              Yes
            </button></a>
          <a href="${keys.redirectDomain}/api/surveys/thanks">
            <button type="button"
            style="background-color :#f44336; border: none;
                  color: white; padding: 10px 24px;
                  text-decoration: none; display: inline-block;
                  font-size: 14px; border-radius: 12px;">
              No
            </button></a>
        </div>
      </body>
    </html>
  `;
};