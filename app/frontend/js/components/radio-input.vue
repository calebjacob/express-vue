<template>
  <div class="radio-input">
    <label class="label">{{ label }}</label>

    <div class="radio-input__options">
      <div class="radio-input__option" v-for="(option, index) in options" :key="option.value">
        <template v-if="index === 0">
          <input class="radio-input__input" type="radio" :name="name" :id="name + index" :value="option.value" v-model="val" v-validate="validations" :data-vv-as="label | lowercase(true)">
        </template>

        <template v-else>
          <input class="radio-input__input" type="radio" :name="name" :id="name + index" :value="option.value" v-model="val">
        </template>

        <label class="radio-input__label" :for="name + index">{{ option.display }}</label>
      </div>
    </div>

    <input-error :error="errors.first(scopedInputName)" />
  </div>
</template>



<script>
  export default {
    name: 'RadioInput',

    props: {
      label: {
        type: String,
        required: true
      },

      name: {
        type: String,
        required: true
      },

      options: {
        type: Array,
        required: true
      },

      validations: {
        type: Object,
        default() {
          return {};
        }
      },

      value: {
        type: [String, Number, Boolean],
        default: null
      }
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
    }
  };
</script>
