import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RippleModule } from "primeng/ripple";
import { StyleClassModule } from "primeng/styleclass";
import { DividerModule } from "primeng/divider";
import { ChartModule } from "primeng/chart";
import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { BadgeModule } from "primeng/badge";
import { InputSwitchModule } from "primeng/inputswitch";
import { RadioButtonModule } from "primeng/radiobutton";
import { SidebarModule } from "primeng/sidebar";
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AvatarGroupModule } from "primeng/avatargroup";
import { AvatarModule } from "primeng/avatar";
import { CalendarModule } from "primeng/calendar";
import { CarouselModule } from "primeng/carousel";
import { CardModule } from "primeng/card";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { GalleriaModule } from "primeng/galleria";
import { ImageModule } from "primeng/image";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { KnobModule } from "primeng/knob";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenubarModule } from "primeng/menubar";
import { MenuModule } from "primeng/menu";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelMenuModule } from "primeng/panelmenu";
import { TabMenuModule } from "primeng/tabmenu";
import { ToastModule } from "primeng/toast";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RatingModule } from "primeng/rating";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SkeletonModule } from "primeng/skeleton";
import { SliderModule } from "primeng/slider";
import { SpeedDialModule } from "primeng/speeddial";
import { SplitButtonModule } from "primeng/splitbutton";
import { SplitterModule } from "primeng/splitter";
import { StepsModule } from "primeng/steps";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TieredMenuModule } from "primeng/tieredmenu";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD MMM YYYY",
  },
  display: {
    dateInput: "DD MMM YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@NgModule({
  imports: [
    CommonModule,

    AccordionModule,
    AutoCompleteModule,
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CardModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FormsModule,
    GalleriaModule,
    ImageModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenubarModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SliderModule,
    SpeedDialModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    StyleClassModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
  ],
  exports: [
    CommonModule,

    AccordionModule,
    AutoCompleteModule,
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FormsModule,
    GalleriaModule,
    ImageModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenubarModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SliderModule,
    SpeedDialModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    StyleClassModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "en-gb" }],
  declarations: [],
})
export class CustomUiModule {
  static forRoot() {
    return {
      ngModule: CustomUiModule,
      providers: [],
    };
  }
}
