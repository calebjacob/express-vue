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
      it('formats their input', () => {
        wrapper.setData({
          myValue: '122333'
        });

        expect(wrapper.element.value).toEqual('1/22/333');
        expect(wrapper.vm.myValue).toEqual('1/22/333');
      });

      it('reformats other formats', () => {
        wrapper.setData({
          myValue: '1.22 333'
        });

        expect(wrapper.element.value).toEqual('1/22/333');
        expect(wrapper.vm.myValue).toEqual('1/22/333');
      });

      it('strips out non digit characters', () => {
        wrapper.setData({
          myValue: 'a1.22}3D33'
        });

        expect(wrapper.element.value).toEqual('1/22/333');
        expect(wrapper.vm.myValue).toEqual('1/22/333');
      });
    });
  });



  describe('cardNumber', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        template: '<input type="text" v-model="myValue" v-mask-input="\'cardNumber\'">'
      });
    });

    describe('when user changes input', () => {
      it('formats their input', () => {
        wrapper.setData({
          myValue: '1234123412341234'
        });

        expect(wrapper.element.value).toEqual('1234 1234 1234 1234');
        expect(wrapper.vm.myValue).toEqual('1234 1234 1234 1234');
      });

      it('reformats other formats', () => {
        wrapper.setData({
          myValue: '1234 1234.1234 / 1234'
        });

        expect(wrapper.element.value).toEqual('1234 1234 1234 1234');
        expect(wrapper.vm.myValue).toEqual('1234 1234 1234 1234');
      });

      it('strips out non digit characters', () => {
        wrapper.setData({
          myValue: '12,34/1234a1234-12.34b'
        });

        expect(wrapper.element.value).toEqual('1234 1234 1234 1234');
        expect(wrapper.vm.myValue).toEqual('1234 1234 1234 1234');
      });
    });
  });



  describe('cardExpiration', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        template: '<input type="text" v-model="myValue" v-mask-input="\'cardExpiration\'">'
      });
    });

    describe('when user changes input', () => {
      it('formats their input', () => {
        wrapper.setData({
          myValue: '0618'
        });

        expect(wrapper.element.value).toEqual('06/18');
        expect(wrapper.vm.myValue).toEqual('06/18');
      });

      it('reformats other formats', () => {
        wrapper.setData({
          myValue: '06.18'
        });

        expect(wrapper.element.value).toEqual('06/18');
        expect(wrapper.vm.myValue).toEqual('06/18');
      });

      it('strips out non digit characters', () => {
        wrapper.setData({
          myValue: 'a.0.6 foo18!'
        });

        expect(wrapper.element.value).toEqual('06/18');
        expect(wrapper.vm.myValue).toEqual('06/18');
      });

      it('prepends a 0 if needed', () => {
        wrapper.setData({
          myValue: '6/18'
        });

        expect(wrapper.element.value).toEqual('06/18');
        expect(wrapper.vm.myValue).toEqual('06/18');
      });

      it('does not prepend a 0 when not needed', () => {
        wrapper.setData({
          myValue: '12/20'
        });

        expect(wrapper.element.value).toEqual('12/20');
        expect(wrapper.vm.myValue).toEqual('12/20');
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
      it('formats their input', () => {
        wrapper.setData({
          myValue: '1231231234'
        });

        expect(wrapper.element.value).toEqual('123-123-1234');
        expect(wrapper.vm.myValue).toEqual('123-123-1234');
      });

      it('reformats other formats', () => {
        wrapper.setData({
          myValue: '(123) 123-1234'
        });

        expect(wrapper.element.value).toEqual('123-123-1234');
        expect(wrapper.vm.myValue).toEqual('123-123-1234');
      });

      it('strips out non digit characters', () => {
        wrapper.setData({
          myValue: '.1/2a3)123{12--34'
        });

        expect(wrapper.element.value).toEqual('123-123-1234');
        expect(wrapper.vm.myValue).toEqual('123-123-1234');
      });
    });
  });
});

