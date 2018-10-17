<template>
  <div class="text-input">
    <label class="label" :for="name">{{ label }}</label>

    <input v-if="type === 'dollars'" class="text-input__input" type="number" @input="inputHandler" @blur="blurHandler" v-bind="attributes" v-validate="allValidations">

    <input v-else-if="type === 'email'" class="text-input__input" type="email" @input="inputHandler" @blur="blurHandler" v-bind="attributes" v-validate="allValidations">

    <input v-else-if="type === 'number'" class="text-input__input" type="number" @input="inputHandler" @blur="blurHandler" v-bind="attributes" v-validate="allValidations">

    <input v-else-if="type === 'phone'" class="text-input__input" type="tel" @input="inputHandler" @blur="blurHandler" v-bind="attributes" v-validate="allValidations" v-mask-input="'phone'">

    <input v-else-if="type === 'text'" class="text-input__input" type="text" @input="inputHandler" @blur="blurHandler" v-bind="attributes" v-validate="allValidations" v-mask-input="mask">

    <input-error :error="errors.first(scopedInputName)" />
  </div>
</template>



<script>
  import lowercase from '@/filters/lowercase';



  export default {
    name: 'TextInput',

    props: {
      label: {
        type: String,
        required: true
      },

      mask: {
        type: [String, Object],
        default: null
      },

      name: {
        type: String,
        required: true
      },

      placeholder: {
        type: String,
        default: null
      },

      type: {
        type: String,
        required: true
      },

      validations: {
        type: Object,
        default() {
          return {};
        }
      },

      value: {
        type: [String, Number],
        default: null
      }
    },

    computed: {
      allValidations: {
        get() {
          const defaults = {};

          if (this.type === 'dollars') {
            defaults.decimal = 2;
          }

          else if (this.type === 'email') {
            defaults.email = true;
          }

          else if (this.type === 'phone') {
            defaults.regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          }

          return Object.assign(defaults, this.validations);
        }
      },

      attributes: {
        get() {
          return {
            'data-vv-as': lowercase(this.label, true),
            id: this.name,
            name: this.name,
            placeholder: this.placeholder,
            value: this.value
          };
        }
      },

      scopedInputName: {
        get() {
          if (this.validatedForm.name) {
            return `${this.validatedForm.name}.${this.name}`;
          }


          return this.name;
        }
      }
    },

    inject: {
      $validator: {
        from: '$validator'
      },

      validatedForm: {
        from: 'validatedForm',
        default() {
          return {};
        }
      }
    },

    methods: {
      blurHandler(event) {
        /*
          If a number isn't formatted correctly in the
          input (for examle: "20.2.2" or "1-2.4"), the
          browser will return an empty string as the
          input value. On blur, we'll reset all empty
          string values to null to remove potentially
          bad input.
        */

        if (event.target.value === '') {
          this.$emit('input', null);
        }
      },

      inputHandler(event) {
        let newValue = event.target.value;

        if (this.type === 'dollars' || this.type === 'number') {
          if (event.target.value) {
            newValue = Number(event.target.value);
          }
        }

        this.$emit('input', newValue);
      }
    }
  };
</script>
