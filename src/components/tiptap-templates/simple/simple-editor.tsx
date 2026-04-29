"use client"

// technical
import { useEffect, useRef, useState } from "react"
import { Editor, EditorContent, EditorContext } from "@tiptap/react"
import { useRouter } from "next/navigation"

// --- UI Primitives ---
import { Button } from "@hwasanchae/components/tiptap-ui-primitive/button"
import { Spacer } from "@hwasanchae/components/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@hwasanchae/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import "@hwasanchae/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@hwasanchae/components/tiptap-node/code-block-node/code-block-node.scss"
import "@hwasanchae/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@hwasanchae/components/tiptap-node/list-node/list-node.scss"
import "@hwasanchae/components/tiptap-node/image-node/image-node.scss"
import "@hwasanchae/components/tiptap-node/heading-node/heading-node.scss"
import "@hwasanchae/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@hwasanchae/components/tiptap-ui/heading-dropdown-menu"
import { ListDropdownMenu } from "@hwasanchae/components/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@hwasanchae/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@hwasanchae/components/tiptap-ui/code-block-button"
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@hwasanchae/components/tiptap-ui/color-highlight-popover"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@hwasanchae/components/tiptap-ui/link-popover"
import { MarkButton } from "@hwasanchae/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@hwasanchae/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@hwasanchae/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@hwasanchae/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@hwasanchae/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@hwasanchae/components/tiptap-icons/link-icon"

// --- Hooks ---
import { useIsBreakpoint } from "@hwasanchae/hooks/use-is-breakpoint"
import { useWindowSize } from "@hwasanchae/hooks/use-window-size"
import { useCursorVisibility } from "@hwasanchae/hooks/use-cursor-visibility"

// --- Styles ---
import "@hwasanchae/components/tiptap-templates/simple/simple-editor.scss"
import style from "@hwasanchae/components/tiptap-templates/simple/simple-editor.scss"
import { ThemeToggle } from "./theme-toggle"

// template
import { FONT_OPTIONS, THEME_OPTIONS } from "@hwasanchae/app/template/variants" // ✅ 

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)

type User = "writer" | "reader" | "developer";

export type Theme = {
  label: string;
  value: {
    fontColor: string;
    backColor: string;
  }
}

type Props = {
  editor: Editor | null;
  user: User;
  myFont?: string | null;
  theme?: Theme | null;
  handleOnChangeFont?: (e: any) => void;
  handleOnChangeTheme?: (e: any) => void;
}

export function SimpleEditor(
  { 
    editor, 
    user, 
    myFont, 
    theme, 
    handleOnChangeFont, 
    handleOnChangeTheme
  }: Props) {
  const isMobile = useIsBreakpoint()
  const { height } = useWindowSize()
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  )
  const toolbarRef = useRef<HTMLDivElement>(null)

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
        const anchor = (e.target as HTMLElement).closest("a");

        if (anchor && anchor.getAttribute("href")) {
            e.preventDefault();
            e.stopPropagation();

            const href = anchor.getAttribute("href")!;
            router.push(href); // 🔥 INI YANG MEMICU MODAL
        }
    }

  return (
    <div 
      className="simple-editor-wrapper" 
      style={user === "reader" && theme ? {
        '--editor-bg': theme.value.backColor,
        '--editor-text': theme.value.fontColor
      } as React.CSSProperties : {}}
    >
      <EditorContext.Provider value={{ editor }}>
        {user === "writer" && 
          <Toolbar
            ref={toolbarRef}
            style={{
              ...(isMobile
                ? {
                    bottom: `calc(100% - ${height - rect.y}px)`,
                  }
                : {}),
            }}
          >
            {mobileView === "main" ? (
              <MainToolbarContent
                onHighlighterClick={() => setMobileView("highlighter")}
                onLinkClick={() => setMobileView("link")}
                isMobile={isMobile}
              />
            ) : (
              <MobileToolbarContent
                type={mobileView === "highlighter" ? "highlighter" : "link"}
                onBack={() => setMobileView("main")}
              />
            )}
          </Toolbar>
        }

        {user === "reader" && 
          myFont && 
          theme &&
          handleOnChangeFont && 
          handleOnChangeTheme &&
          
          <div className="reader-toolbar" style={{ backgroundColor: theme.value.backColor, color: theme.value.fontColor }}>
            <select 
              name="selectTheme" 
              className="themeSelector"
              id="colorFont"
              value={theme.label}
              onChange={(e) => handleOnChangeTheme(e)}
            >
              {THEME_OPTIONS.map((theme) => (
                <option 
                  key={theme.label} 
                  value={theme.label}
                  style={{ backgroundColor: theme.value.backColor, color: theme.value.fontColor, fontWeight: 700 }}
                >
                  {theme.label}
                </option>
              ))}
            </select>

            <select 
              name="selectFont" 
              className="fontSelector"
              id="font"
              value={myFont}
              onChange={(e) => handleOnChangeFont(e)}
            >
              {FONT_OPTIONS.map((font) => (
                <option 
                  key={font.label} 
                  value={font.value}
                  style={{ backgroundColor: theme.value.backColor, color: theme.value.fontColor, fontStyle: font.value }}
                >
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        }

        <EditorContent
          editor={editor}
          role="presentation"
          className={`simple-editor-content ${user === "reader" && `font-${myFont ? myFont : 'inter'}`}`}
          onClick={user === "reader" ? handleClick : undefined}
        />
      </EditorContext.Provider>
    </div>
  )
}
