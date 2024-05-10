import { FieldProps } from "formik";
import { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TextEditorTypes extends FieldProps {
    label?: string,
    inputProps: any,
    isValid: any
}

const TextEditor: FC<TextEditorTypes> = (props) => {
    const { field, form, } = props;
    const handleEditorChange = (newContent: string) => {
        form.setFieldValue(field.name, newContent);
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <Editor
                apiKey="9m2btcvfrlo8e5zhtac5p2lok31k017h1txv88i27wcetmcw"
                value={field?.value}
                init={{
                    placeholder: 'Text here',
                    menubar: true,
                    height: "100vh",
                    plugins: [
                        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                        'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
                        'table', 'emoticons', 'template', 'help'
                    ],
                    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                        'forecolor backcolor emoticons | help' + 'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                    menu: {
                        favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
                    },
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                }}
                onEditorChange={(newContent) => handleEditorChange(newContent)}
            />
        </div>
    );
};

export default TextEditor;