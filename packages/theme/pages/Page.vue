<template>
  <SfLoader :loading="loading">
    <div>
      <SfHeading
        v-if="page.content_heading"
        :title="page.content_heading"
        :level="1"
        class="sf-heading--no-underline sf-heading--left"
      />
      <div v-dompurify-html="page.content" />
    </div>
  </SfLoader>
</template>
<script lang="ts">
import {
  SfLoader,
  SfHeading,
} from '@storefront-ui/vue';
import { useContent } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    SfLoader,
    SfHeading,
  },
  props: {
    identifier: {
      type: [String],
      default: '',
    },
  },
  setup(props) {
    const { page, loadContent, loading } = useContent('cmsPage');
    onSSR(async () => {
      await loadContent(props.identifier);
    });
    return {
      page,
      loading,
    };
  },
  head() {
    const title = this.page.meta_title ? this.page.meta_title : this.page.title;
    const meta = [];
    if (this.page.meta_description) {
      meta.push({ hid: 'description', name: 'description', content: this.page.meta_description });
    }
    return {
      title,
      meta,
    };
  },
});
</script>
