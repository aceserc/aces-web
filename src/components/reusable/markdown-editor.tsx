"use client";
import { MAX_FILE_SIZE_IN_BYTES } from "@/constants/size.constant";
import { handleUploadFileService } from "@/services/file";
import { IFile } from "@/zod/file.schema";
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
import { toast } from "sonner";

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
  updateUsedImagesList?: (image: IFile) => void;
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
      if (img.size > MAX_FILE_SIZE_IN_BYTES) {
        toast.error(
          `Image size should be less than ${
            MAX_FILE_SIZE_IN_BYTES / 1024 / 1024
          }MB`
        );
        throw new Error("Image size limit exceeded");
      }

      let dialogs = document.querySelectorAll("[role=dialog]");
      Array.from(dialogs).forEach((dialog) => {
        const submitButton = dialog?.querySelector(
          "button[type=submit]"
        ) as HTMLButtonElement;

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerText = "Loading...";
        }
      });

      const res = await handleUploadFileService(img, imageFolder);

      // @ts-ignore
      if (updateUsedImagesList) updateUsedImagesList(res);

      Array.from(dialogs).forEach((dialog) => {
        const submitButton = dialog?.querySelector(
          "button[type=submit]"
        ) as HTMLButtonElement;

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerText = "Submit";
        }
      });

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
  updateUsedImagesList?: (image: IFile) => void;
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
