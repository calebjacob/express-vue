<template>
  <div class="text-input">
    <label class="label" :for="name">{{ label }}</label>

    <input class="text-input__input" type="text" :name="name" :id="name" :placeholder="placeholder" @blur="blurHandler" v-model="val" v-validate="validations" v-mask-input="mask" :data-vv-as="label | lowercase(true)" v-if="type === 'text'">

    <input class="text-input__input" type="number" :name="name" :id="name" :placeholder="placeholder" @blur="blurHandler" v-model="val" v-validate="{
      required: validations.required || false,
      decimal: 2,
      min_value: validations.min_value
    }" :data-vv-as="label | lowercase(true)" v-else-if="type === 'dollars'">

    <input class="text-input__input" type="email" :name="name" :id="name" :placeholder="placeholder" @blur="blurHandler" v-model="val" v-validate="{
      required: validations.required || false,
      email: true
    }" :data-vv-as="label | lowercase(true)" v-else-if="type === 'email'">

    <input class="text-input__input" type="tel" :name="name" :id="name" :placeholder="placeholder" @blur="blurHandler" v-model="val" v-mask-input="'phone'" v-validate="{
      required: validations.required || false,
      regex: phoneRegex
    }" :data-vv-as="label | lowercase(true)" v-else-if="type === 'phone'">

    <input-error :error="errors.first(scopedInputName)" />
  </div>
</template>



<script>
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

    data() {
      return {
        phoneRegex: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
      };
    },

    computed: {
      scopedInputName: {
        get() {
          if (this.validatedForm.name) {
            return `${this.validatedForm.name}.${this.name}`;
          }


          return this.name;
        }
      },

      val: {
        get() {
          return this.value;
        },

        set(newValue) {
          this.$emit('input', newValue);
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
      blurHandler() {
        /*
          If a number isn't formatted correctly in the input (for examle: "20.2.2" or "1-2.4"),
          the browser will return an empty string as the input value. On blur, we'll reset
          all empty string values to null to remove potentially bad input.
        */

        if (this.val === '') {
          this.val = null;
        }
      }
    }
  };
</script>
