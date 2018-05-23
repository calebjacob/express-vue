// subject:

import maskInput from '@/directives/mask-input';



// directive setup:

const localVue = createLocalVue();

localVue.directive('maskInput', maskInput);



// wrapper:

function createWrapper(options) {
  const component = {
    data() {
      return {
        myValue: ''
      };
    },

    template: options.template
  };

  const wrapper = shallowMount(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('directive - maskInput', () => {
  let wrapper;

  describe('custom', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        template: `<input type="text" v-model="myValue" v-mask-input="{
          segments: [1, 2, 3],
          separator: '/'
        }">`
      });
    });

    describe('when user changes input', () => {
      it('formats their input', (done) => {
        wrapper.vm.myValue = '122333';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('1/22/333');
          expect(wrapper.vm.myValue).toEqual('1/22/333');

          done();
        });
      });

      it('reformats other formats', (done) => {
        wrapper.vm.myValue = '1.22 333';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('1/22/333');
          expect(wrapper.vm.myValue).toEqual('1/22/333');

          done();
        });
      });

      it('strips out non digit characters', (done) => {
        wrapper.vm.myValue = 'a1.22}3D33';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('1/22/333');
          expect(wrapper.vm.myValue).toEqual('1/22/333');

          done();
        });
      });
    });
  });

  describe('creditCard', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        template: '<input type="text" v-model="myValue" v-mask-input="\'creditCard\'">'
      });
    });

    describe('when user changes input', () => {
      it('formats their input', (done) => {
        wrapper.vm.myValue = '1234123412341234';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('1234-1234-1234-1234');
          expect(wrapper.vm.myValue).toEqual('1234-1234-1234-1234');

          done();
        });
      });

      it('reformats other formats', (done) => {
        wrapper.vm.myValue = '1234 1234.1234 / 1234';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('1234-1234-1234-1234');
          expect(wrapper.vm.myValue).toEqual('1234-1234-1234-1234');

          done();
        });
      });

      it('strips out non digit characters', (done) => {
        wrapper.vm.myValue = '12,34/1234a1234-12.34b';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('1234-1234-1234-1234');
          expect(wrapper.vm.myValue).toEqual('1234-1234-1234-1234');

          done();
        });
      });
    });
  });

  describe('phone', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        template: '<input type="phone" v-model="myValue" v-mask-input="\'phone\'">'
      });
    });

    describe('when user changes input', () => {
      it('formats their input', (done) => {
        wrapper.vm.myValue = '1231231234';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('123-123-1234');
          expect(wrapper.vm.myValue).toEqual('123-123-1234');

          done();
        });
      });

      it('reformats other formats', (done) => {
        wrapper.vm.myValue = '(123) 123-1234';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('123-123-1234');
          expect(wrapper.vm.myValue).toEqual('123-123-1234');

          done();
        });
      });

      it('strips out non digit characters', (done) => {
        wrapper.vm.myValue = '.1/2a3)123{12--34';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.element.value).toEqual('123-123-1234');
          expect(wrapper.vm.myValue).toEqual('123-123-1234');

          done();
        });
      });
    });
  });
});

