"use client";
import { handleUploadFileService } from "@/services/file";
import {
  toolbarPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  SandpackConfig,
  MDXEditor,
} from "@mdxeditor/editor";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const reactSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

type PluginsProps = {
  diffMarkdown: string;
  imageAutocompleteSuggestions: string[];
  imageFolder: string;
  updateUsedImagesList?: (image: string) => void;
};
const allPlugins = ({
  diffMarkdown,
  imageAutocompleteSuggestions,
  imageFolder,
  updateUsedImagesList,
}: PluginsProps) => [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageUploadHandler: async (img): Promise<string> => {
      const dialog = document.getElementById("radix-:r1h:");
      const submitButton = dialog?.querySelector(
        "button[type=submit]"
      ) as HTMLButtonElement;

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerText = "Loading...";
      }

      const res = await handleUploadFileService(img, imageFolder);
      if (updateUsedImagesList) updateUsedImagesList(res.url!);

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerText = "Submit";
      }

      return res.url!;
    },
    imageAutocompleteSuggestions,
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
  sandpackPlugin({ sandpackConfig: reactSandpackConfig }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "text",
      tsx: "TypeScript",
    },
  }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
  markdownShortcutPlugin(),
];

type Props = {
  onChange: (value: string) => void;
  value: string;
  imageFolder?: string;
  usedImagesList?: string[];
  updateUsedImagesList?: (image: string) => void;
};

export default function MarkDownEditor({
  onChange,
  value,
  imageFolder = "images",
  usedImagesList = [],
  updateUsedImagesList,
}: Props) {
  return (
    <MDXEditor
      markdown={value}
      onChange={onChange}
      contentEditableClassName="prose max-w-full font-sans"
      plugins={allPlugins({
        diffMarkdown: value,
        imageAutocompleteSuggestions: usedImagesList,
        imageFolder,
        updateUsedImagesList,
      })}
    />
  );
}
