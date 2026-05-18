<template>
  <div class="card">
    <p class="description">
      Please note that Adobe Reader or its equivalent is required to view the resultant document.
    </p>

    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" name="name" type="text" placeholder="John Milton" value="John Milton" />
    </div>
    <div class="form-group">
      <label for="gender">Gender</label>
      <select id="gender" name="gender">
        <option value="Male" selected>Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div class="form-group">
      <label for="dob">Date of Birth</label>
      <input id="dob" name="dob" type="date" value="2012-12-05" />
    </div>
    <div class="form-group">
      <label for="email">Email ID</label>
      <input id="email" name="email" type="email" placeholder="john.milton@example.com" value="john.milton@example.com" />
    </div>
    <div class="form-group">
      <label for="state">Coming from</label>
      <select id="state" name="state">
        <option value="Alabama" selected>Alabama</option>
        <option value="Alaska">Alaska</option>
        <option value="Arizona">Arizona</option>
        <option value="Arkansas">Arkansas</option>
        <option value="California">California</option>
      </select>
    </div>
    <div class="form-group">
      <div class="inline">
        <input id="newsletter" name="newsletter" type="checkbox" />
        <label for="newsletter" style="font-weight: 600; margin-top:10px;">Would you like to receive our Newsletter?</label>
      </div>
    </div>

    <div class="btn-row">
      <button id="btnViewTemplate" class="e-btn">View Template</button>
      <button id="btnFillForm" class="e-btn">Fill Form</button>
      <button id="btnFillFlatten" class="e-btn">Fill And Flatten</button>
    </div>

    <div id="action-description">
      <p>
        This sample demonstrates how to fill and flatten the form fields to personalize your PDF document.It is also possible to create, edit, flatten, and delete the form fields using the JavaScript PDF Library.
      </p>
    </div>

    <div id="description">
      <p>More information about the forms can be found in this documentation <a href="https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/formfields">section</a>.</p>
    </div>
  </div>
</template>
<style scoped>

  .card {
    background: #fff;
    padding: 20px 0px;
    max-width: none;
    margin: 0 auto;
  }

  .description {
    font-size: 14px;
    margin-bottom: 12px;
    color: #4a4a4a;
  }

  .form-group { margin-bottom: 12px; }
  label { display: block; font-weight: 600; margin-bottom: 6px; }
  input[type="text"], input[type="email"], input[type="date"], select {
    width: 100%; padding: 8px 10px; border: 1px solid #d6d6d6; border-radius: 4px; font-size: 14px; box-sizing: border-box; background: #fff;
  }
  .inline { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
  .btn-row { display: flex; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
</style>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { Button } from '@syncfusion/ej2-buttons';
import {
  PdfDocument,
  PdfForm,
  PdfTextBoxField,
  PdfCheckBoxField,
  PdfListFieldItem,
  PdfComboBoxField,
  PdfRadioButtonListField
} from '@syncfusion/ej2-pdf';

export default defineComponent({
  name: 'FormFillings',
  setup() {
    // Button instances so we can disable during operations and destroy on unmount
    let viewBtn: any = null;
    let fillBtn: any = null;
    let fillFlatBtn: any = null;

    onMounted(() => {
      try {
        viewBtn = new Button({}, '#btnViewTemplate');
        fillBtn = new Button({}, '#btnFillForm');
        fillFlatBtn = new Button({}, '#btnFillFlatten');

        if (viewBtn && viewBtn.element) (viewBtn.element as HTMLButtonElement).onclick = () => viewPdf();
        if (fillBtn && fillBtn.element) (fillBtn.element as HTMLButtonElement).onclick = () => fillPdf('fill');
        if (fillFlatBtn && fillFlatBtn.element) (fillFlatBtn.element as HTMLButtonElement).onclick = () => fillPdf('flatten');
      } catch (err) {
        console.error('Failed to initialize buttons in form-fillings sample:', err);
      }
    });

    onUnmounted(() => {
      try {
        if (viewBtn && typeof viewBtn.destroy === 'function') viewBtn.destroy();
        if (fillBtn && typeof fillBtn.destroy === 'function') fillBtn.destroy();
        if (fillFlatBtn && typeof fillFlatBtn.destroy === 'function') fillFlatBtn.destroy();
      } catch (e) {
        // ignore
      }
    });

    let viewBusy = false;
    let fillBusy = false;

    async function fillPdf(mode: 'fill' | 'flatten'): Promise<void> {
      if (fillBusy) return;
      fillBusy = true;
      // disable fill buttons while operation runs
      try { if (fillBtn && fillBtn.element) (fillBtn.element as HTMLButtonElement).disabled = true; } catch {}
      try { if (fillFlatBtn && fillFlatBtn.element) (fillFlatBtn.element as HTMLButtonElement).disabled = true; } catch {}
      try {
        const pdfBytes = await fetchAsUint8Array('https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf');
        const values = getFormValues();
        const pdf = new PdfDocument(pdfBytes as any);
        const form = (pdf as any).form as PdfForm;

        const nameField = findByName(form, 'name') as PdfTextBoxField | undefined;
        if (nameField) {
          nameField.text = values.name;
          nameField.setAppearance(true);
        }

        const gender = findByName(form, 'gender') as PdfRadioButtonListField | undefined;
        if (gender) {
          switch (values.gender) {
              case 'Male': gender.selectedIndex = 0; break;
              case 'Female': gender.selectedIndex = 1; break;
              case 'Other': gender.selectedIndex = 2; break;
            }
          gender.setAppearance(true);
        }

        const dobField = findByName(form, 'dob') as PdfTextBoxField | undefined;
        if (dobField) {
          dobField.text = values.dob;
          dobField.setAppearance(true);
        }

        const emailField = findByName(form, 'email') as PdfTextBoxField | undefined;
        if (emailField) {
          emailField.text = values.email;
          emailField.setAppearance(true);
        }

        const state = findByName(form, 'state') as PdfComboBoxField | undefined;
        if (state) {
          switch (values.state) {
            case 'Alabama':
              state.selectedIndex = 0;
              break;
            case 'Alaska':
                state.selectedIndex = 1;
                break;
            case 'Arizona':
                state.selectedIndex = 2;
                break;
            case 'Arkansas':
                state.selectedIndex = 3;
                break;
            case 'California':
                state.selectedIndex = 4;
                break;
          }
          state.setAppearance(true);
        }

        const newsField = findByName(form, 'newsletter') as PdfCheckBoxField | undefined;
        if (newsField) {
          newsField.checked = values.newsletter;
          newsField.setAppearance(true);
        }

        if (mode === 'flatten') {
          (pdf as any).flatten = true;
        }

        (pdf as any).save(mode === 'flatten' ? 'FormFillFlatten.pdf' : 'FormFillings.pdf');
        (pdf as any).destroy();
      } catch (err) {
        console.error(err);
        alert('Failed to fill the PDF.');
      } finally {
        fillBusy = false;
        try { if (fillBtn && fillBtn.element) (fillBtn.element as HTMLButtonElement).disabled = false; } catch {}
        try { if (fillFlatBtn && fillFlatBtn.element) (fillFlatBtn.element as HTMLButtonElement).disabled = false; } catch {}
      }
    }

    function downloadBlob(blob: Blob, fileName: string): void {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    async function viewPdf(): Promise<void> {
      if (viewBusy) return;
      viewBusy = true;
      try { if (viewBtn && viewBtn.element) (viewBtn.element as HTMLButtonElement).disabled = true; } catch {}
      try {
        const pdfBytes = await fetchAsUint8Array('https://cdn.syncfusion.com/content/pdf-resources/form-filling-document.pdf');
        downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'FormFillings.pdf');
      } catch (err) {
        console.error(err);
        alert('Failed to load the PDF.');
      } finally {
        viewBusy = false;
        try { if (viewBtn && viewBtn.element) (viewBtn.element as HTMLButtonElement).disabled = false; } catch {}
      }
    }

    function getFormValues() {
      const name = document.querySelector<HTMLInputElement>('#name');
      const gender = document.querySelector<HTMLSelectElement>('#gender');
      const dobRaw = document.querySelector<HTMLInputElement>('#dob');
      const email = document.querySelector<HTMLInputElement>('#email');
      const state = document.querySelector<HTMLSelectElement>('#state');
      const newsletter = document.querySelector<HTMLInputElement>('#newsletter');
      const dob = (() => {
        const raw = dobRaw?.value ?? '';
        if (!raw) return '';
        const [yyyy, mm, dd] = raw.split('-');
        return `${mm}/${dd}/${yyyy}`;
      })();
      return {
        name: name?.value ?? '',
        gender: (gender?.value as 'Male' | 'Female' | 'Other') ?? 'Male',
        dob,
        email: email?.value ?? '',
        state: state?.value ?? '',
        newsletter: !!newsletter?.checked
      };
    }

    function findByName(form: PdfForm, name: string) {
      for (let i = 0; i < (form as any).count; i++) {
        const field = (form as any).fieldAt(i);
        if (field && field.name === name) return field;
      }
      return undefined;
    }

    return {};
  }
});

async function fetchAsUint8Array(url: string): Promise<Uint8Array> {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}
</script>