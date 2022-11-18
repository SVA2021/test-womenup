import React, {FC} from 'react';
import styles from './TemplateName.module.scss';
import {TemplateNameProps} from './TemplateName.type';

export const TemplateName: FC = ({ }: TemplateNameProps) => (
  <div className={styles.TemplateName} data-testid="TemplateName">
    TemplateName Component
  </div>
);