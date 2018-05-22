// subject:

import dropDown from '@/directives/drop-down';



// directive setup:

const component = {
  template: `
    <span v-drop-down="{
      class: 'my-open-drop-down-class'
    }">Click Me</span>
  `
};

const localVue = createLocalVue();

localVue.directive('dropDown', dropDown);



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('directive - dropDown', () => {
  let clickEvent;
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();

    clickEvent = new Event('click');
  });

  describe('when the drop down is clicked', () => {
    beforeEach(() => {
      wrapper.element.dispatchEvent(clickEvent);
    });

    it('adds the open class to element', () => {
      expect(wrapper.element.classList.contains('my-open-drop-down-class')).toEqual(true);
    });

    describe('when there is a click anywhere in the document', () => {
      beforeEach((done) => {
        setTimeout(() => {
          document.dispatchEvent(clickEvent);
          done();
        });
      });

      it('removes the open class from element', () => {
        expect(wrapper.element.classList.contains('my-open-drop-down-class')).toEqual(false);
      });

      describe('when the drop down is clicked again', () => {
        beforeEach((done) => {
          setTimeout(() => {
            wrapper.element.dispatchEvent(clickEvent);
            done();
          });
        });

        it('adds the open class to element', () => {
          expect(wrapper.element.classList.contains('my-open-drop-down-class')).toEqual(true);
        });
      });
    });
  });
});
