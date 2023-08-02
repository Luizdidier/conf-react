import BaseProvider from './index';

describe('base provider', () => {
  let provider;

  beforeEach(() => {
    provider = new BaseProvider();
  });

  describe('public api', () => {
    describe('on', () => {
      let onPublished = () => {};

      beforeEach(() => {
        provider.on('published', onPublished);
      });

      it('attaches an event handler for the event passed in', () => {
        expect(provider._events['published']).toEqual(onPublished);
      });
    });

    describe('trigger', () => {
      let onUnPublished = jest.fn();

      beforeEach(() => {
        provider.on('unpublished', onUnPublished);
        provider.trigger('unpublished');
      });

      it('triggers the event handler attached', () => {
        expect(onUnPublished).toHaveBeenCalled();
      });
    });

    describe('supportsVideo', () => {
      it('does not support video', () => {
        expect(provider.supportsVideo()).toEqual(false);
      });
    });
  });
});
