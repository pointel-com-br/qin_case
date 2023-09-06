import { QinNature } from "qin_soul";
import { QinEdit } from "./qin-edit";

export class QinText extends QinEdit<string> {
    public constructor(options?: QinTextSet, isQindred?: string) {
        super((isQindred ? isQindred + "_" : "") + "string", document.createElement("textarea"));
        this.styleAsEditable();
        if (options?.maxLength) {
            this.castedQine().maxLength = options.maxLength;
            let position = Math.min(Math.max(options.maxLength - 10, 0), 90);
            let width = Math.floor(90 + (position * 7) / 3);
            this.qinedHTML.style.width = width + "px";
        }
        if (options?.rows) {
            this.castedQine().rows = options?.rows;
        }
        if (options?.cols) {
            this.castedQine().cols = options?.cols;
        }
        if (options?.initial) {
            this.setData(options.initial);
        }
        if (options?.readOnly) {
            this.turnReadOnly();
        }
        this.prepareEdit();
    }

    public override castedQine(): HTMLTextAreaElement {
        return this.qinedHTML as HTMLTextAreaElement;
    }

    public override styled(styles: Partial<CSSStyleDeclaration>): QinText {
        super.styled(styles);
        return this;
    }

    public override getNature(): QinNature {
        return QinNature.TEXT;
    }

    protected override getData(): string {
        return this.castedQine().value;
    }

    protected override setData(data: string) {
        this.castedQine().value = data;
    }

    protected override mayChange(): HTMLElement[] {
        return [this.castedQine()];
    }

    public override turnReadOnly(): void {
        this.castedQine().readOnly = true;
        this.styleAsReadOnly();
    }

    public override turnEditable(): void {
        this.castedQine().readOnly = false;
        this.styleAsEditable();
    }

    public override isEditable(): boolean {
        return !this.castedQine().readOnly;
    }

    public insertAtCursor(data: string) {
        if (!data) return;
        let startPos = this.castedQine().selectionStart;
        let endPos = this.castedQine().selectionEnd;
        let oldVal = this.castedQine().value;
        let newVal =
            (startPos > 0 ? oldVal.substring(0, startPos) : "") +
            data +
            (endPos < oldVal.length ? oldVal.substring(endPos) : "");
        this.value = newVal;
        this.castedQine().selectionStart = startPos;
        this.castedQine().selectionEnd = startPos + data.length;
    }

    public appendLine(line: string) {
        let buffer = this.castedQine().value;
        if (buffer) {
            buffer += "\n";
        }
        buffer += line;
        this.castedQine().value = buffer;
    }
}

export type QinTextSet = {
    initial?: string;
    maxLength?: number;
    readOnly?: boolean;
    rows?: number;
    cols?: number;
};
