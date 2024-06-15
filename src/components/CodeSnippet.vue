<template>
  <div class="code-snippet">
    <span class="code-snippet__title">{{ title }}</span>
    <div class="code-snippet__container">
      <div class="code-snippet__wrapper">
        <pre class="code-snippet__body">{{ code }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeSnippet",
  props: {
    code: String,
    title: String,
  },
};
</script>

<style scoped>
.code-snippet {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.8rem;
  margin-top: 3.2rem;
  overflow: hidden;
}

.code-snippet__title {
  height: 4.8rem;
  width: 100%;

  background-color: #bdc4cf;
  color: #000000;

  font-family: "Fira Code", source-code-pro, Menlo, Monaco, Consolas,
    "Courier New", monospace;
  font-weight: 600;

  /*  responsive */

  font-size: 1.6rem;
  line-height: 2.4rem;
  padding: 1.2rem 1.6rem;
}

.code-snippet__container {
  background-color: #2a2e35;
  overflow-x: auto;
}

.code-snippet__wrapper {
  display: inline-block;
  padding: 32px;
}

.code-snippet__body {
  margin: 0;

  color: #fff;
  font-size: 16px;
  line-height: 32px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

@media only screen and (max-width: 480px) {
  .code-snippet__title {
    /*  responsive */

    height: 4.4rem;

    font-size: 1.4rem;
    line-height: 2.2rem;
    padding: 1.2rem 1.6rem;
  }

  .code-snippet__wrapper {
    padding: 1.6rem;
  }

  .code-snippet__body {
    font-size: 1.4rem;
    line-height: 2.4rem;
  }
}
</style>
