import logger from './index';

describe('logger', () => {
  describe('public api', () => {
    describe('log', () => {
      describe('if not configured', () => {
        let returnedValue;

        beforeEach(() => {
          returnedValue = logger.log('CONNECTED', 'some detail');
        });

        it('returns false if not configured', () => {
          expect(returnedValue).toBeFalsy();
        });
      });

      describe('if configured', () => {
        let event = {};

        beforeEach(() => {
          logger.config({
            jwt: '123abc'
          });

          logger.request = {
            post: jest.fn()
          };

          logger.log('CONNECTED', event, 'some detail');
        });

        it('makes a post request to the url configured', () => {
          expect(logger.request.post).toHaveBeenCalledWith(
            logger.url,
            {
              log: {
                log_status_cd: 'CONNECTED',
                detail: 'some detail',
                event: '{}'
              }
            }
          );
        });
      });
    });

    describe('config', () => {
      let returnedValue;

      beforeEach(() => {
        returnedValue = logger.config({
          jwt: '123abc'
        });
      });

      it('sets the url property', () => {
        expect(logger.url).toEqual(`${logger._config.baseURL}/${logger._config.endpoint}`);
      });

      it('creates the request instance', () => {
        expect(logger.request).not.toBeNull();
      });

      it('sets the authorization header', () => {
        expect(logger.request.defaults.headers.common.Authorization).toEqual('Bearer: 123abc');
      });

      it('sets isConfigured to true', () => {
        expect(logger.isConfigured).toBeTruthy();
      });

      it('returns the logger object', () => {
        expect(returnedValue).toEqual(logger);
      });
    });
  });
});
